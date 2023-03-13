from ._version import __version__
from ._readingKernel import *

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "gsoc2023_task1"
    }]


