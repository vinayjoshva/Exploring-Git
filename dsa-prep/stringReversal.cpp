#include <iostream>

using namespace std;

int main()
{
  string str = "Hello";

  for (int i = str.length(); i >= 0; i--)
  {
    /* code */
    cout << str[i];
  }
}
