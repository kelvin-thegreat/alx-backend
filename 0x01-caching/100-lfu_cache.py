#!/usr/bin/env python3
"""LFU caching module.
"""

from collections import defaultdict
from base_caching import BaseCaching

class LFUCache(BaseCaching):
    """A cache that uses the Least Frequently Used (LFU) eviction policy."""

    def __init__(self):
        """Initialize the LFU cache."""
        super().__init__()
        self.cache_data = {}
        self.key_frequency = defaultdict(int)

    def put(self, key, item):
        """Add an item to the cache while enforcing LFU eviction if the limit is reached."""
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            min_frequency = min(self.key_frequency.values())
            keys_to_discard = [k for k, freq in self.key_frequency.items() if freq == min_frequency]

            if len(keys_to_discard) > 1:  
                lru_key = min(keys_to_discard, key=lambda k: self.cache_data[k][2])
                keys_to_discard.remove(lru_key)

            for key_to_discard in keys_to_discard:
                del self.cache_data[key_to_discard]
                del self.key_frequency[key_to_discard]
                print(f"DISCARD: {key_to_discard}\n")

        self.cache_data[key] = [item, 0] 
        self.key_frequency[key] = 0
        self.key_frequency.default_factory = lambda: 1   

    def get(self, key):
        """Retrieve an item from the cache by its key."""
        if key is not None and key in self.cache_data:
            value, frequency = self.cache_data[key]
            self.key_frequency[key] += 1
            return value
        return None
