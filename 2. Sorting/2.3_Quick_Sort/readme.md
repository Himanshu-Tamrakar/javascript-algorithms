for example, mergesort is linearithmic for a randomly ordered array that has only a
constant number of distinct key values, but quicksort with 3-way partitioning is linear
for such an array. Indeed, by examining the visual trace above, you can see that N times
the number of key values is a conservative bound on the running time.

Proposition M. No compare-based sorting algorithm can guarantee to sort N items
with fewer than NH - N compares, where H is the Shannon entropy, defined from
the frequencies of key values.

Proposition N. Quicksort with 3-way partitioning uses ~ (2ln 2) NH compares to
sort N items, where H is the Shannon entropy, defined from the frequencies of key
values
Note that H = lg N when the keys are all distinct (all the probabilities are 1/N), which
is consistent with Proposition I in Section 2.2 and Proposition K