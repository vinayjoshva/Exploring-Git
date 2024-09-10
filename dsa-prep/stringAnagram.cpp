#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int main()
{
  string str = "cabcbabacd", p = "abc";
  int i = 0, j = 0, count = 0;
  int strarr[26] = {}, parr[26] = {};
  int totalSize = sizeof(parr);

  // Calculate the size of one element of the array in bytes
  int elementSize = sizeof(parr[0]);

  // Calculate the number of elements in the array
  int size = totalSize / elementSize;

  for (int i = 0; i < p.length(); i++)
  {
    /* code */
    // char ch = p[i];
    parr[p[i] - 'a'] += 1;
  }

  while (j < str.length())
  {
    // char ch = str[i];
    strarr[str[j] - 'a'] += 1;

    if (j - i + 1 == p.length())
    {
      if (equal(begin(strarr), end(strarr), begin(parr)))
      {
        count++;
      }
      strarr[str[i] - 'a'] -= 1;
      i++;
    }
    j++;
  }

  cout << count;
}