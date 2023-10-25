#!/usr/bin/env python3
"""LIFO caching module.
"""

from base_caching import BaseCaching

from collections import OrderedDict

class LIFOCache(BaseCaching):
    """A cache that uses Last-In, First-Out (LIFO) eviction policy."""

    def __init__(self):
        """Initialize the LIFO cache."""
        super().__init__()

    def put(self, key, item):
        """Add an item to the cache while enforcing LIFO eviction if the limit is reached."""
        if key is None or item is None:
            return  
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last_key = list(self.cache_data.keys())[-1]
            del self.cache_data[last_key]
            print(f"DISCARD: {last_key}\n")

    def get(self, key):
        """Retrieve an item from the cache by its key."""
        return self.cache_data.get(key, None)

