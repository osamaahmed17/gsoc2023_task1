ipykernel_imported = True
try:
    from ipykernel import zmqshell
except ImportError:
    ipykernel_imported = False




class KernelConnector:
    """ Main singleton object for the kernel extension """

    def __init__(self, ipython):
        """ Constructor """
        self.ipython = ipython
        self.connected = False
     

    def send(self, msg):
        """Send a message to the frontend"""
        self.comm.send(msg)


    def handle_comm_message(self, msg):
        action = msg['content']['data']['action']
        if action:
            # The user is already connected, tell the frontend
            if self.connected:
                self.send_ok(
                    'kernelconn-connected',
                )
                self.ipython.push({"connection":"Yes"})  # Add to users namespace

                # Tell frontend
                self.send(
                    'connected'
                )
                # Set state to connected for connector
                self.connected = True
                return
        else:
            # Unknown action requested
            print("Received wrong message: %s", str(msg))
            return

    def register_comm(self):
        """ Register a comm_target which will be used by frontend to start communication """
        print("communitcation registered")
        self.ipython.kernel.comm_manager.register_target(
            "KernelConnector", self.target_func)

    def target_func(self, comm, msg):
        """ Callback function to be called when a frontend comm is opened """
        print("Established connection to frontend")
        print("Received message: %s", str(msg))
        self.comm = comm

        @self.comm.on_msg
        def _recv(msg):
            self.handle_comm_message(msg)

        # Check the current status of the kernel and tell frontend
        # If the user refreshes the page, he will still see the correct state
        if self.connected:
            # If connected, additionally propagate connection config
            self.send(
                'kernelconn-connected',
            )      


def load_ipython_extension(ipython):
    """ Load Jupyter kernel extension """

    if ipykernel_imported:
        if not isinstance(ipython, zmqshell.ZMQInteractiveShell):
            print("KernelConnector: Ipython not running through notebook. So exiting.")
            return
    else:
        return

    print("Starting KernelConnector Kernel Extension")
    monitor = KernelConnector(ipython)
    monitor.register_comm()

