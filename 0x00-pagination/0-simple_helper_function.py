#!/usr/bin/env python3
'''
  Task 0.  Simple helper function.
'''

def index_range(page, page_size):
    """
    Return a tuple of start and end indexes for a given page and page size.
    Page numbers are 1-indexed.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index
