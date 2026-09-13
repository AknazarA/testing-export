"""Independent acceptance contract for the Cayu #1444 qualification fixture."""

from __future__ import annotations

import argparse
import importlib.util
import subprocess
from pathlib import Path

ALLOWED_CHANGE_PATHS = frozenset({"range_ops.py", "tests/test_range_ops.py"})


def _changed_paths(repository: Path, base: str, head: str) -> set[str]:
    completed = subprocess.run(
        [
            "git",
            "-C",
            str(repository),
            "diff",
            "--name-only",
            "--no-renames",
            base,
            head,
            "--",
        ],
        check=True,
        capture_output=True,
        text=True,
        timeout=15,
    )
    return {line for line in completed.stdout.splitlines() if line}


def _load_candidate(repository: Path):
    path = repository / "range_ops.py"
    specification = importlib.util.spec_from_file_location("qualification_candidate", path)
    if specification is None or specification.loader is None:
        raise RuntimeError("Unable to load range_ops.py.")
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    operation = getattr(module, "in_closed_range", None)
    if not callable(operation):
        raise RuntimeError("range_ops.py does not define callable in_closed_range().")
    return operation


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repository", type=Path, required=True)
    parser.add_argument("--base", required=True)
    parser.add_argument("--head", required=True)
    arguments = parser.parse_args()

    repository = arguments.repository.resolve(strict=True)
    changed = _changed_paths(repository, arguments.base, arguments.head)
    if "range_ops.py" not in changed or not changed <= ALLOWED_CHANGE_PATHS:
        raise SystemExit(
            "Candidate must change range_ops.py and may change only "
            f"{sorted(ALLOWED_CHANGE_PATHS)}; observed {sorted(changed)}."
        )

    operation = _load_candidate(repository)
    probes = tuple(
        (value, lower, upper)
        for lower in range(-2, 3)
        for upper in range(lower, 3)
        for value in range(-3, 4)
    )
    if len(probes) != 105:
        raise RuntimeError("Independent probe corpus identity changed.")
    for value, lower, upper in probes:
        actual = operation(value, lower, upper)
        expected = lower <= value <= upper
        if type(actual) is not bool or actual is not expected:
            raise SystemExit(
                "Independent probe failed for "
                f"value={value}, lower={lower}, upper={upper}."
            )


if __name__ == "__main__":
    main()
