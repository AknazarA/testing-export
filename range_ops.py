"""Small integer range utilities."""


def in_closed_range(value: int, lower: int, upper: int) -> bool:
    """Return whether value belongs to the inclusive range [lower, upper]."""
    return lower <= value < upper
