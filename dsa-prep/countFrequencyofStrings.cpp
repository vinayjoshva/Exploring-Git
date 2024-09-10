#include <iostream>

using namespace std;

int main()
{
  string str = "abbacbca"; // output shoud be a - 3, b - 3, c - 2
  int arr[26] = {};
  int totalSize = sizeof(arr);

  // Calculate the size of one element of the array in bytes
  int elementSize = sizeof(arr[0]);

  // Calculate the number of elements in the array
  int size = totalSize / elementSize;

  for (int i = 0; i < str.length(); i++)
  {
    /* code */
    char ch = str[i];
    arr[ch - 'a'] += 1;
  }

  for (int i = 0; i < size; i++)
  {
    /* code */
    if (arr[i] != 0)
    {
      cout << char(i + 'a') << " - " << arr[i] << endl;
    }
  }
}