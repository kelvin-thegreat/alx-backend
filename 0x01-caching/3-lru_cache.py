#!/usr/bin/env python3
"""LRU Caching Module"""

from collections import OrderedDict

from base_caching import BaseCaching

class LRUCache(BaseCaching):
    """A cache that uses the Least Recently Used (LRU) eviction policy."""

    def __init__(self):
        """Initialize the LRU cache."""
        super().__init__()
        # Use an ordered dictionary to maintain items in their access order
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Add an item to the cache while enforcing LRU eviction if the limit is reached."""
        if key is None or item is None:
            return  # Skip if the key or item is invalid

        if key not in self.cache_data:
            # Check if adding the item would exceed the cache's capacity
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                # Remove and print the LRU item (based on access order)
                lru_key, _ = self.cache_data.popitem(last=True)
                print("DISCARD:", lru_key)

           

