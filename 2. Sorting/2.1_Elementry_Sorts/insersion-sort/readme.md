Proposition B. Insertion sort uses ~N^2/4 compares and ~N^2/4 exchanges to sort
a randomly ordered array of length N with distinct keys, on the average. The worst
case is ~N^2/2 compares and ~N^2/2 exchanges and the best case is N-1 compares
and 0 exchanges.
Proof: Just as for Proposition A, the number of compares and exchanges is easy to
visualize in the N-by-N diagram that we use to illustrate the sort. We count entries
below the diagonal—all of them, in the worst case, and none of them, in the best
case. For randomly ordered arrays, we expect each item to go about halfway back,
on the average, so we count one-half of the entries below the diagonal.
The number of compares is the number of exchanges plus an additional term
equal to N minus the number of times the item inserted is the smallest so far. In the
worst case (array in reverse order), this term is negligible in relation to the total; in
the best case (array in order) it is equal to N-1.


Insertion sort works well for certain types of nonrandom arrays that often arise in
practice, even if they are huge. 
For example, as just mentioned, consider what happens
when you use insertion sort on an array that is already sorted. Each item is immediately
determined to be in its proper place in the array, and the total running time is linear.
(The running time of selection sort is quadratic for such an array.) The same is true
for arrays whose keys are all equal (hence the condition in Proposition B that the keys
must be distinct).


Insertion sort is an efficient method for such arrays; selection sort is not. Indeed, when
the number of inversions is low, insertion sort is likely to be faster than any sorting
method that we consider in this chapter.



Proposition C. The number of exchanges used by insertion sort is equal to the
number of inversions in the array, and the number of compares is at least equal to
the number of inversions and at most equal to the number of inversions plus the
array size minus 1.
Proof: Every exchange involves two inverted adjacent entries and thus reduces the
number of inversions by one, and the array is sorted when the number of inver-
sions reaches zero. Every exchange corresponds to a compare, and an additional
compare might happen for each value of i from 1 to N-1 (when a[i] does not
reach the left end of the array).

In summary, insertion sort is an excellent method for partially sorted arrays and is also
a fine method for tiny arrays. These facts are important not just because such arrays
frequently arise in practice, but also because both types of arrays arise in intermediate
stages of advanced sorting algorithms, so we will be considering insertion sort again in
relation to such algorithms