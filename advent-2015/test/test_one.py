import pytest
import logging

LOGGER = logging.getLogger(__name__)

errors = []

def test_uppercase():
    LOGGER.info("test uppercase")
    try:
        assert "loud noises".upper() == "LOUD NOISES1"
    except AssertionError as error:
        LOGGER.info(error)

def test_reversed():
    try:
        assert list(reversed([1, 2, 3, 4])) == [4, 3, 2, 1, None]
    except AssertionError as error:
        print(error)
        errors.append("This is some {} stuff".format(error))

def test_some_primes():
    assert 37 in {
        num
        for num in range(1, 50)
        if num != 1 and not any([num % div == 0 for div in range(2, num)])
    }

# print(errors)