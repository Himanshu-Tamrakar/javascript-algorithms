 
 Another approach to merge two sorted array
 Exercise 2.2.10
 Exercise 2.2.23
 Exercise 2.2.8

Proposition F. Top-down mergesort uses between 1⁄2 N lg N and N lg N compares to
sort any array of length N.

Proposition G. Top-down mergesort uses at most 6N lg N array accesses to sort an
array of length N.

Proposition H. Bottom-up mergesort uses between 1⁄2 N lg N and N lg N compares
and at most 6N lg N array accesses to sort an array of length N.

Proposition I. No compare-based sorting algorithm can guarantee to sort N items
with fewer than lg(N !) ~ N lg N compares.
N! <= number of leaves <= 2^h

Proposition J. Mergesort is an asymptotically optimal compare-based sorting
algorithm.

■ Mergesort is not optimal with respect to space usage.
■ The worst case may not be likely in practice.
■ Operations other than compares (such as array accesses) may be important.
■ One can sort certain data without using any compares.