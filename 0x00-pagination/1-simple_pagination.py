#!/usr/bin/env python3
"""Task 1. Hypermedia pagination sample.
"""
import csv
import math
from typing import Dict, List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieve a page of data from the dataset based on the provided page and page_size.

        :param page: The page number (default is 1).
        :param page_size: The number of items per page (default is 10).
        :return: A list of rows from the dataset.
        """
        assert isinstance(page, int) and page > 0, "Page must be a positive integer"
        assert isinstance(page_size, int) and page_size > 0, "Page size must be a positive integer"

        dataset = self.dataset()
        total_rows = len(dataset)

        start, end = index_range(page, page_size)

        if start >= total_rows:
            return []  # Page is out of range.

        return dataset[start:end]

def index_range(page, page_size):
    """
    Return a tuple of start and end indexes for a given page and page size.
    Page numbers are 1-indexed.

    :param page: The page number (1-indexed).
    :param page_size: The number of items per page.
    :return: A tuple of start and end indexes (0-indexed) for the requested page.
    """

    '''Calculate the start and end indexes for the requested page.'''
    start_index = (page - 1) * page_size
    end_index = page * page_size

    return (start_index, end_index)
