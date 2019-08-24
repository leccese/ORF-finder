# ORF-finder

Bug fix by Haopeng Yu:
1. There is no ORF overlap in the same reading frame.
2. Fixed a BUG in the negative reading frame.
3. Optimized the algorithm.
4. The ORF prediction of instance sequences is the same as NCBI's ORFfinder results.

Note:
NCBI predictions contain incomplete termination codons, which are not included in this script.

Finds all open reading frames (ORFs) in a DNA sequence

To-Do:
1. Unit tests to compare to NCBI ORF Finder
2. Minimum ORF length option
3. Alternative start codon option
4. Import nucleotide sequence from NCBI .fna file
5. Included nested ORFs
6. Incomplete termination codons
