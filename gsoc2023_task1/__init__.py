from ._version import __version__
from ipylab import JupyterFrontEnd


def main():
   app = JupyterFrontEnd()
   print(app)


if __name__ == "__main__":
    main()

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "gsoc2023_task1"
    }]


