from ._version import __version__
from .readingKernel import *


def _jupyter_labextension_paths():
    return [dict(
                src= "labextension",
                dest= "gsoc2023_task1")
            ]

