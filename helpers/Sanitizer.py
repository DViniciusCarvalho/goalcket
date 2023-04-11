from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

import bleach
from pydantic import validate_arguments


class Sanitizer:
    @validate_arguments
    @staticmethod
    def input_valid(*inputs: str) -> bool:
        some_input_is_dirty = any(input != bleach.clean(input) for input in inputs)
        if some_input_is_dirty:
            return False
        return True

