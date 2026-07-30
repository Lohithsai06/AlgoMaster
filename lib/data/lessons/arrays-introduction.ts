import type { ILessonData } from "@/lib/types";

/* ============================================================
   Lesson: Introduction to Arrays
   Complete JSON-driven lesson content.
   ============================================================ */

export const arraysLesson: ILessonData = {
  id: "arrays-introduction",
  title: "Introduction to Arrays",
  chapterId: "arrays",
  difficulty: "Beginner",
  estimatedTime: "20 min",
  objectives: [
    "Understand what an array is and why it exists as a data structure",
    "Learn how array indexing works (0-based indexing)",
    "Understand memory layout of arrays and why it matters for performance",
    "Perform basic operations: access, insert, delete, and traverse",
    "Analyze time complexity of array operations",
  ],
  prerequisites: [
    { title: "Basic programming concepts", link: "/learn" },
  ],
  introduction:
    "An array is a collection of elements stored at contiguous memory locations. It is one of the most fundamental data structures in computer science — nearly every program uses arrays to organize and process data. Arrays allow you to store multiple values of the same type under a single name and access any element instantly using its index.",
  whyItMatters: {
    realWorld:
      "Think of a spreadsheet with rows of data, a playlist of songs, or a list of student grades. All of these are arrays in disguise. Any time you need to store and process a collection of related items, arrays are the natural first choice.",
    industryApplication:
      "Arrays power everything from image processing (pixel buffers are arrays) to database indexing (B-trees use array-like structures) to machine learning (tensors are multi-dimensional arrays). Understanding arrays is non-negotiable for any software engineer.",
  },
  theory: {
    paragraphs: [
      "An array is a linear data structure that stores elements in contiguous (adjacent) memory locations. Each element can be identified by its index — a number that represents the element's position in the array.",
      "In most programming languages, array indices start at 0. This means the first element is at index 0, the second at index 1, and so on. The last element in an array of size n is at index n-1.",
      "Because array elements are stored in contiguous memory, accessing any element by its index is an O(1) operation — the computer simply calculates the memory address as: base_address + index × element_size. This is what makes arrays incredibly fast for lookups.",
      "However, inserting or deleting elements in the middle of an array requires shifting all subsequent elements, making these operations O(n). This trade-off between fast access and slow modification is the defining characteristic of arrays.",
    ],
    diagramType: "memory-layout",
  },
  realLifeAnalogy: {
    title: "A Row of Lockers",
    description:
      "Imagine a hallway with a row of lockers, each numbered sequentially from 0. Each locker holds one item. If you want the item in locker 3, you walk directly to it — no need to check lockers 0, 1, and 2 first. That's exactly how array indexing works: the index tells the computer exactly where to find the element in memory, instantly.",
  },
  dryRun: {
    initialState: [42, 17, 89, 23, 56],
    steps: [
      {
        description: "Start with an array of 5 elements. Each element has an index from 0 to 4.",
        state: [42, 17, 89, 23, 56],
      },
      {
        description: "Access element at index 2: arr[2] = 89. This is an O(1) operation — the computer jumps directly to that memory location.",
        state: [42, 17, 89, 23, 56],
      },
      {
        description: "Update element at index 1: arr[1] = 99. The old value 17 is replaced with 99.",
        state: [42, 99, 89, 23, 56],
      },
      {
        description: "Insert 77 at index 3. All elements from index 3 onward must shift right. This is an O(n) operation.",
        state: [42, 99, 89, 77, 23, 56],
      },
      {
        description: "Delete element at index 0. All elements shift left by one position. Also O(n).",
        state: [99, 89, 77, 23, 56],
      },
    ],
  },
  visualizationConfig: {
    engine: "array",
    initialData: [42, 17, 89, 23, 56],
    executionFrames: [
      {
        dataState: [42, 17, 89, 23, 56],
        activeIndices: [],
        sortedIndices: [],
        highlightedLines: [1],
        highlightedCodeLines: [1],
        teacherExplanation: "We start with an array of 5 elements. Each cell holds a value, and each has an index from 0 to 4.",
        stepLabel: "Initial State",
      },
      {
        dataState: [42, 17, 89, 23, 56],
        activeIndices: [2],
        sortedIndices: [],
        highlightedLines: [2],
        highlightedCodeLines: [2],
        teacherExplanation: "Accessing arr[2] — the computer calculates the memory address directly: base + 2 × elementSize. This is O(1), instant access.",
        stepLabel: "Access arr[2] = 89",
      },
      {
        dataState: [42, 99, 89, 23, 56],
        activeIndices: [1],
        sortedIndices: [],
        highlightedLines: [3],
        highlightedCodeLines: [3],
        teacherExplanation: "We update arr[1] from 17 to 99. The old value is overwritten in place. This is also O(1) since we know the exact memory location.",
        stepLabel: "Update arr[1] = 99",
      },
      {
        dataState: [42, 99, 89, 77, 23, 56],
        activeIndices: [3, 4, 5],
        sortedIndices: [],
        highlightedLines: [4],
        highlightedCodeLines: [4],
        teacherExplanation: "Inserting 77 at index 3 requires shifting elements at indices 3, 4, and 5 to the right. This is O(n) because we may need to move many elements.",
        stepLabel: "Insert 77 at index 3",
        predictionPrompt: {
          question: "After inserting 77 at index 3, what happens to the element that was previously at index 3 (value 23)?",
          options: ["It gets deleted", "It shifts to index 4", "It stays at index 3", "It shifts to index 2"],
          correctAnswer: "It shifts to index 4",
          explanation: "When inserting at index 3, all elements from index 3 onward shift right by one position. So 23 moves from index 3 to index 4, and 56 moves from index 4 to index 5.",
        },
      },
      {
        dataState: [99, 89, 77, 23, 56],
        activeIndices: [0, 1, 2, 3, 4],
        sortedIndices: [],
        highlightedLines: [5],
        highlightedCodeLines: [5],
        teacherExplanation: "Deleting arr[0] requires all remaining elements to shift left by one position. 99 moves to index 0, 89 to index 1, and so on. This is O(n).",
        stepLabel: "Delete arr[0]",
      },
      {
        dataState: [99, 89, 77, 23, 56],
        activeIndices: [0, 1, 2, 3, 4],
        sortedIndices: [0, 1, 2, 3, 4],
        highlightedLines: [6],
        highlightedCodeLines: [6],
        teacherExplanation: "Traversal visits every element from index 0 to n-1. This is O(n) since we must visit each element once. Traversal is the foundation for searching, sorting, and many other operations.",
        stepLabel: "Traverse all elements",
      },
    ],
  },
  pseudocode: [
    "CREATE array = [42, 17, 89, 23, 56]",
    "ACCESS element at index 2 → returns 89",
    "UPDATE element at index 1 → set to 99",
    "INSERT 77 at index 3 → shift elements right",
    "DELETE element at index 0 → shift elements left",
    "TRAVERSE all elements from 0 to n-1",
  ],
  multiLangCode: {
    javascript: `// Array Operations in JavaScript
let arr = [42, 17, 89, 23, 56];

// Access by index — O(1)
console.log(arr[2]); // 89

// Update by index — O(1)
arr[1] = 99;

// Insert at index — O(n)
arr.splice(3, 0, 77);

// Delete at index — O(n)
arr.shift();

// Traverse — O(n)
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`,
    python: `# Array Operations in Python (Lists)
arr = [42, 17, 89, 23, 56]

# Access by index — O(1)
print(arr[2])  # 89

# Update by index — O(1)
arr[1] = 99

# Insert at index — O(n)
arr.insert(3, 77)

# Delete at index — O(n)
arr.pop(0)

# Traverse — O(n)
for val in arr:
    print(val)`,
    java: `// Array Operations in Java
int[] arr = {42, 17, 89, 23, 56};

// Access by index — O(1)
System.out.println(arr[2]); // 89

// Update by index — O(1)
arr[1] = 99;

// Insert at index — O(n) (requires new array)
int[] newArr = new int[arr.length + 1];
System.arraycopy(arr, 0, newArr, 0, 3);
newArr[3] = 77;
System.arraycopy(arr, 3, newArr, 4, 2);

// Delete at index — O(n) (requires new array)
int[] delArr = new int[newArr.length - 1];
System.arraycopy(newArr, 1, delArr, 0, delArr.length);

// Traverse — O(n)
for (int val : delArr) {
    System.out.println(val);
}`,
    cpp: `// Array Operations in C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {42, 17, 89, 23, 56};

    // Access by index — O(1)
    cout << arr[2] << endl; // 89

    // Update by index — O(1)
    arr[1] = 99;

    // Insert at index — O(n)
    arr.insert(arr.begin() + 3, 77);

    // Delete at index — O(n)
    arr.erase(arr.begin());

    // Traverse — O(n)
    for (int val : arr) {
        cout << val << endl;
    }
    return 0;
}`,
  },
  complexity: {
    best: "O(1) for access",
    average: "O(n) for insertion/deletion",
    worst: "O(n) for insertion/deletion",
    space: "O(n) to store n elements",
    explanation:
      "Access by index is O(1) because the memory address is calculated directly. Insertion and deletion are O(n) because elements may need to shift. Traversal is always O(n) since every element must be visited.",
  },
  practiceExercises: [
    {
      id: "arrays-practice-1",
      type: "dry-run",
      title: "Trace Array Access",
      description: "Given the array [10, 20, 30, 40, 50], what is the value at index 3?",
      initialData: [10, 20, 30, 40, 50],
      correctAnswer: "40",
      explanation: "Array indices start at 0, so index 3 refers to the 4th element: 40.",
    },
    {
      id: "arrays-practice-2",
      type: "prediction",
      title: "Predict the Result",
      description: "If you insert the value 99 at index 1 in the array [5, 10, 15], what will the array look like?",
      prompt: "What will the array look like after inserting 99 at index 1?",
      options: ["[5, 99, 10, 15]", "[99, 5, 10, 15]", "[5, 10, 99, 15]", "[5, 10, 15, 99]"],
      correctAnswer: "[5, 99, 10, 15]",
      explanation: "Inserting at index 1 shifts the original elements at index 1 and 2 to the right. So 10 moves to index 2 and 15 moves to index 3.",
    },
    {
      id: "arrays-practice-3",
      type: "multiple-choice",
      title: "Time Complexity of Access",
      description: "What is the time complexity of accessing an element by its index in an array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: "O(1)",
      explanation: "Array access is O(1) because the memory address is calculated as base_address + index × element_size, requiring no iteration.",
    },
    {
      id: "arrays-practice-4",
      type: "fill-in-the-blank",
      title: "Index Calculation",
      description: "In an array of size 8, the last element is at index ___.",
      correctAnswer: "7",
      explanation: "Since array indices start at 0, the last element in an array of size n is at index n-1. For size 8, that's index 7.",
    },
    {
      id: "arrays-practice-5",
      type: "structured-coding",
      title: "Write Array Traversal",
      description: "Write a loop that prints every element in an array called 'arr' using 0-based indexing. Use any language you prefer.",
      starterCode: `// Your code here
// Hint: Use a for loop from 0 to arr.length - 1`,
      expectedOutput: "Each element printed on a new line",
      explanation: "A standard for loop from i=0 to i < arr.length (or i <= n-1) visits every element. This is O(n) and is the foundation for searching and sorting.",
    },
  ],
  quiz: [
    {
      id: "arrays-quiz-1",
      type: "multiple-choice",
      question: "What is the index of the first element in an array?",
      options: [
        { id: "a", label: "1", isCorrect: false },
        { id: "b", label: "0", isCorrect: true },
        { id: "c", label: "-1", isCorrect: false },
        { id: "d", label: "Depends on the language", isCorrect: false },
      ],
      explanation: "In virtually all modern programming languages, array indices start at 0. The first element is at index 0.",
    },
    {
      id: "arrays-quiz-2",
      type: "multiple-choice",
      question: "Why is array access O(1)?",
      options: [
        { id: "a", label: "Because arrays are small", isCorrect: false },
        { id: "b", label: "Because the memory address is calculated directly from the index", isCorrect: true },
        { id: "c", label: "Because arrays use hash tables", isCorrect: false },
        { id: "d", label: "Because the CPU caches array data", isCorrect: false },
      ],
      explanation: "The memory address of any element is calculated as: base_address + index × element_size. This direct calculation makes access O(1).",
    },
    {
      id: "arrays-quiz-3",
      type: "multiple-choice",
      question: "What is the time complexity of inserting an element at the beginning of an array?",
      options: [
        { id: "a", label: "O(1)", isCorrect: false },
        { id: "b", label: "O(log n)", isCorrect: false },
        { id: "c", label: "O(n)", isCorrect: true },
        { id: "d", label: "O(n²)", isCorrect: false },
      ],
      explanation: "Inserting at the beginning requires shifting all n elements to the right by one position, making it O(n).",
    },
    {
      id: "arrays-quiz-4",
      type: "true-false",
      question: "Array elements are stored in contiguous memory locations.",
      options: [
        { id: "a", label: "True", isCorrect: true },
        { id: "b", label: "False", isCorrect: false },
      ],
      explanation: "Yes — contiguous memory is the defining feature of arrays. It's what enables O(1) access by index.",
    },
    {
      id: "arrays-quiz-5",
      type: "fill-in-the-blank",
      question: "In an array of size 10, the index of the last element is ___.",
      correctAnswer: "9",
      explanation: "With 0-based indexing, the last element in an array of size n is at index n-1. For size 10, that's index 9.",
    },
  ],
  nextLessonId: "sorting-bubble-sort",
};
