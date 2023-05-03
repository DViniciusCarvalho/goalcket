from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from bleach import clean
from pydantic import validate_arguments


@validate_arguments
def input_valid(*inputs: str) -> bool:
    some_input_is_dirty = any(input != clean(input) for input in inputs)
    if some_input_is_dirty:
        return False
    return True