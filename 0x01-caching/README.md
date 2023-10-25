# 0x01-caching Solution

## Resources: Read or watch: 

[Cache replacement policies - FIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_%28FIFO%29)

[Cache replacement policies - LIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_%28FIFO%29)

[Cache replacement policies - LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_%28FIFO%29)

[Cache replacement policies - MRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_%28FIFO%29)

[Cache replacement policies - LFU](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_%28FIFO%29)


# NB:
+ [x] 0. **Parent class BaseCaching**<br/>[basic_cache.py](0basic_cache.py) contains a Python function that All your classes must inherit.
+ [ ]   from `BaseCaching` defined below:
+ [ ]   All your classes must inherit from `BaseCaching` defined below:
  ```python
      #!/usr/bin/python3
      """ BaseCaching module
      """
      
      class BaseCaching():
          """ BaseCaching defines:
            - constants of your caching system
            - where your data are stored (in a dictionary)
          """
          MAX_ITEMS = 4
      
          def __init__(self):
              """ Initiliaze
              """
              self.cache_data = {}
      
          def print_cache(self):
              """ Print the cache
              """
              print("Current cache:")
              for key in sorted(self.cache_data.keys()):
                  print("{}: {}".format(key, self.cache_data.get(key)))
      
          def put(self, key, item):
              """ Add an item in the cache
              """
              raise NotImplementedError("put must be implemented in your cache class")
      
          def get(self, key):
              """ Get an item by key
              """
              raise NotImplementedError("get must be implemented in your cache class")
    ```
## Tasks Done

+ [x] 0. **Basic dictionary**<br/>[0-basic_cache.py](0-basic_cache.py) contains a Python  class `BasicCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + This caching system doesn’t have limit
  + `def put(self, key, item):`
     +   Must assign to the dictionary `self.cache_data` the `item` value for the key `key`.
     +   If `key` or `item` is `None`, this method should not do anything.
  + `def put(self, key, item):`
     +   Must return the value in `self.cache_data` linked to key..
     +   If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[0-main.py](0-main.py) contains a Python script for testing  the Policy:
    ```python
    #!/usr/bin/python3
      """ 0-main """
      BasicCache = __import__('0-basic_cache').BasicCache
      
      my_cache = BasicCache()
      my_cache.print_cache()
      my_cache.put("A", "Hello")
      my_cache.put("B", "World")
      my_cache.put("C", "Holberton")
      my_cache.print_cache()
      print(my_cache.get("A"))
      print(my_cache.get("B"))
      print(my_cache.get("C"))
      print(my_cache.get("D"))
      my_cache.print_cache()
      my_cache.put("D", "School")
      my_cache.put("E", "Battery")
      my_cache.put("A", "Street")
      my_cache.print_cache()
      print(my_cache.get("A"))
    ```
+ [x] 1. **FIFO caching**<br/>[2-lifo_cache.py](1-fifo_cache.py) contains a Python  class `FIFOCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + You can overload `def __init__(self):` but don’t forget to call the parent init: `super().__init__()`
  + `def put(self, key, item):`
    + Must assign to the dictionary self.cache_data the item value for the key key.
    + If  `key` or `item` is `None`, this method should not do anything.
    + If the number of items in `self.cache_data` is higher that `BaseCaching.MAX_ITEMS:`
        + you must discard the first item put in cache (FIFO algorithm)
        + you must print DISCARD: with the key discarded and following by a new line
  + def get(self, key):
    + Must return the value in self.cache_data linked to key.
    + If `key` is `None` or if the `key` doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[1-main.py](1-main.py) contains a Python testing script:
    ```python
      #!/usr/bin/python3
      """ 1-main """
      FIFOCache = __import__('1-fifo_cache').FIFOCache
      
      my_cache = FIFOCache()
      my_cache.put("A", "Hello")
      my_cache.put("B", "World")
      my_cache.put("C", "Holberton")
      my_cache.put("D", "School")
      my_cache.print_cache()
      my_cache.put("E", "Battery")
      my_cache.print_cache()
      my_cache.put("C", "Street")
      my_cache.print_cache()
      my_cache.put("F", "Mission")
      my_cache.print_cache()
    ```

+ [x] 2. **LIFO caching**<br/>[2-lifo_cache.py](2-lifo_cache.py) contains a Python  class `LIFOCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + You can overload `def __init__(self):` but don’t forget to call the parent init: `super().__init__()`
  + `def put(self, key, item):`
    + Must assign to the dictionary self.cache_data the item value for the key key.
    + If  `key` or `item` is `None`, this method should not do anything.
    + If the number of items in `self.cache_data` is higher that `BaseCaching.MAX_ITEMS:`
        + you must discard the last item put in cache (LIFO algorithm)
        + you must print DISCARD: with the key discarded and following by a new line
  + def get(self, key):
    + Must return the value in self.cache_data linked to key.
    + If `key` is `None` or if the `key` doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[2-main.py](2-main.py) contains a Python testing script:
    ```python
      #!/usr/bin/python3
      """ 2-main """
      LIFOCache = __import__('2-lifo_cache').LIFOCache
      
      my_cache = LIFOCache()
      my_cache.put("A", "Hello")
      my_cache.put("B", "World")
      my_cache.put("C", "Holberton")
      my_cache.put("D", "School")
      my_cache.print_cache()
      my_cache.put("E", "Battery")
      my_cache.print_cache()
      my_cache.put("C", "Street")
      my_cache.print_cache()
      my_cache.put("F", "Mission")
      my_cache.print_cache()
      my_cache.put("G", "San Francisco")
      my_cache.print_cache()
    ```
+ [x] 3. **LRU Caching**<br/>[3-lru_cache.py](3-lru_cache.py) contains a Python  class `LRUCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + You can overload `def __init__(self):` but don’t forget to call the parent init: `super().__init__()`
  + `def put(self, key, item):`
    + Must assign to the dictionary self.cache_data the item value for the key key.
    + If  `key` or `item` is `None`, this method should not do anything.
    + If the number of items in `self.cache_data` is higher that `BaseCaching.MAX_ITEMS:`
        + you must discard the least recently used item (LRU algorithm)
        + you must print DISCARD: with the key discarded and following by a new line
  + def get(self, key):
    + Must return the value in self.cache_data linked to key.
    + If `key` is `None` or if the `key` doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[3-main.py](3-main.py) contains a Python testing script:
    ```python
      #!/usr/bin/python3
      """ 3-main """
      LRUCache = __import__('3-lru_cache').LRUCache
      
      my_cache = LRUCache()
      my_cache.put("A", "Hello")
      my_cache.put("B", "World")
      my_cache.put("C", "Holberton")
      my_cache.put("D", "School")
      my_cache.print_cache()
      print(my_cache.get("B"))
      my_cache.put("E", "Battery")
      my_cache.print_cache()
      my_cache.put("C", "Street")
      my_cache.print_cache()
      print(my_cache.get("A"))
      print(my_cache.get("B"))
      print(my_cache.get("C"))
      my_cache.put("F", "Mission")
      my_cache.print_cache()
      my_cache.put("G", "San Francisco")
      my_cache.print_cache()
      my_cache.put("H", "H")
      my_cache.print_cache()
      my_cache.put("I", "I")
      my_cache.print_cache()
      my_cache.put("J", "J")
      my_cache.print_cache()
      my_cache.put("K", "K")
      my_cache.print_cache()
    ```

+ [x] 4. **MRU Caching**<br/>[4-mru_cache.py](4-mru_cache.py) contains a Python  class `MRUCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + You can overload `def __init__(self):` but don’t forget to call the parent init: `super().__init__()`
  + `def put(self, key, item):`
    + Must assign to the dictionary self.cache_data the item value for the key key.
    + If  `key` or `item` is `None`, this method should not do anything.
    + If the number of items in `self.cache_data` is higher that `BaseCaching.MAX_ITEMS:`
        + you must discard the most recently used item (MRU algorithm)
        + you must print DISCARD: with the key discarded and following by a new line
  + def get(self, key):
    + Must return the value in self.cache_data linked to key.
    + If `key` is `None` or if the `key` doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[4-main.py](4-main.py) contains a Python testing script:
    ```python
     #!/usr/bin/python3
      """ 4-main """
      MRUCache = __import__('4-mru_cache').MRUCache
      
      my_cache = MRUCache()
      my_cache.put("A", "Hello")
      my_cache.put("B", "World")
      my_cache.put("C", "Holberton")
      my_cache.put("D", "School")
      my_cache.print_cache()
      print(my_cache.get("B"))
      my_cache.put("E", "Battery")
      my_cache.print_cache()
      my_cache.put("C", "Street")
      my_cache.print_cache()
      print(my_cache.get("A"))
      print(my_cache.get("B"))
      print(my_cache.get("C"))
      my_cache.put("F", "Mission")
      my_cache.print_cache()
      my_cache.put("G", "San Francisco")
      my_cache.print_cache()
      my_cache.put("H", "H")
      my_cache.print_cache()
      my_cache.put("I", "I")
      my_cache.print_cache()
      my_cache.put("J", "J")
      my_cache.print_cache()
      my_cache.put("K", "K")
      my_cache.print_cache()
    ```
  + [x] 5. **LFU Caching**<br/>[5-lfu_cache.py](5-lfu_cache.py) contains a Python  class `LFUCache` that inherits from `BaseCaching` and is a caching system and meets the following requirements:
  + You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
  + You can overload `def __init__(self):` but don’t forget to call the parent init: `super().__init__()`
  + `def put(self, key, item):`
    + Must assign to the dictionary self.cache_data the item value for the key key.
    + If  `key` or `item` is `None`, this method should not do anything.
    + If the number of items in `self.cache_data` is higher that `BaseCaching.MAX_ITEMS:`
        + you must discard the least frequency used item (LFU algorithm)
        + if you find more than 1 item to discard, you must use the LRU algorithm to discard only the least recently used
        + you must print DISCARD: with the key discarded and following by a new line.
  + def get(self, key):
    + Must return the value in self.cache_data linked to key.
    + If `key` is `None` or if the `key` doesn’t exist in `self.cache_data`, return `None`.
  + The following code <br/>[100-main.py](100-main.py) contains a Python testing script:
    ```python
    #!/usr/bin/python3
    """ 100-main """
    LFUCache = __import__('100-lfu_cache').LFUCache
    
    my_cache = LFUCache()
    my_cache.put("A", "Hello")
    my_cache.put("B", "World")
    my_cache.put("C", "Holberton")
    my_cache.put("D", "School")
    my_cache.print_cache()
    print(my_cache.get("B"))
    my_cache.put("E", "Battery")
    my_cache.print_cache()
    my_cache.put("C", "Street")
    my_cache.print_cache()
    print(my_cache.get("A"))
    print(my_cache.get("B"))
    print(my_cache.get("C"))
    my_cache.put("F", "Mission")
    my_cache.print_cache()
    my_cache.put("G", "San Francisco")
    my_cache.print_cache()
    my_cache.put("H", "H")
    my_cache.print_cache()
    my_cache.put("I", "I")
    my_cache.print_cache()
    print(my_cache.get("I"))
    print(my_cache.get("H"))
    print(my_cache.get("I"))
    print(my_cache.get("H"))
    print(my_cache.get("I"))
    print(my_cache.get("H"))
    my_cache.put("J", "J")
    my_cache.print_cache()
    my_cache.put("K", "K")
    my_cache.print_cache()
    my_cache.put("L", "L")
    my_cache.print_cache()
    my_cache.put("M", "M")
    my_cache.print_cache()
    ```


