from range_ops import in_closed_range


def test_upper_endpoint_is_included():
    assert in_closed_range(2, -2, 2) is True


def test_outside_range_is_excluded():
    assert in_closed_range(3, -2, 2) is False
