import type { ILessonData } from "@/lib/types";

/* ============================================================
   Lesson: Bubble Sort
   Complete JSON-driven lesson content with full execution frames.
   ============================================================ */

export const bubbleSortLesson: ILessonData = {
  id: "sorting-bubble-sort",
  title: "Bubble Sort",
  chapterId: "sorting",
  difficulty: "Beginner",
  estimatedTime: "25 min",
  objectives: [
    "Understand the Bubble Sort algorithm and how it works step-by-step",
    "Trace through a complete bubble sort execution on a real array",
    "Understand why bubble sort is O(n²) in the worst and average case",
    "Recognize the optimization that makes bubble sort O(n) in the best case",
    "Implement bubble sort in multiple programming languages",
  ],
  prerequisites: [
    { title: "Introduction to Arrays", link: "/learn/arrays-introduction" },
  ],
  introduction:
    "Bubble Sort is one of the simplest sorting algorithms. It repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the array is repeated until no swaps are needed, meaning the array is sorted. The name comes from the way larger elements 'bubble' to the end of the array with each pass.",
  whyItMatters: {
    realWorld:
      "While bubble sort is rarely used in production due to its O(n²) complexity, it is the perfect algorithm to learn first. It teaches you about comparison-based sorting, nested loops, in-place modification, and algorithmic optimization — concepts that transfer to every other sorting algorithm.",
    industryApplication:
      "Bubble sort's main value is educational. However, the optimization technique (early termination when no swaps occur) is a real-world pattern used in many algorithms. Understanding why bubble sort is slow helps you appreciate faster algorithms like merge sort and quicksort.",
  },
  theory: {
    paragraphs: [
      "Bubble Sort works by making multiple passes through the array. In each pass, it compares each pair of adjacent elements and swaps them if the left element is greater than the right. After each pass, the largest unsorted element 'bubbles up' to its correct position at the end.",
      "For an array of n elements, bubble sort makes at most n-1 passes. In the first pass, the largest element moves to the last position. In the second pass, the second-largest moves to the second-last position, and so on.",
      "The basic version always makes n-1 passes regardless of the input. However, an optimized version can detect if no swaps occurred during a pass — if so, the array is already sorted and the algorithm can terminate early. This makes the best-case complexity O(n) when the input is already sorted.",
      "The worst and average case time complexity is O(n²) because of the nested loop: the outer loop runs n-1 times, and the inner loop runs up to n-1 times in each pass. The space complexity is O(1) since sorting is done in-place.",
    ],
    diagramType: "comparison-swap",
  },
  realLifeAnalogy: {
    title: "Arranging Students by Height",
    description:
      "Imagine students standing in a line, arranged by height. You walk along the line comparing each pair of adjacent students. If the left student is taller than the right, you swap them. After one pass, the tallest student is at the end. You repeat passes until no more swaps are needed. That's bubble sort.",
  },
  dryRun: {
    initialState: [5, 2, 8, 1, 9],
    steps: [
      {
        description: "Start: [5, 2, 8, 1, 9]. Compare 5 and 2 → 5 > 2, swap → [2, 5, 8, 1, 9]",
        state: [2, 5, 8, 1, 9],
      },
      {
        description: "Compare 5 and 8 → 5 < 8, no swap → [2, 5, 8, 1, 9]",
        state: [2, 5, 8, 1, 9],
      },
      {
        description: "Compare 8 and 1 → 8 > 1, swap → [2, 5, 1, 8, 9]",
        state: [2, 5, 1, 8, 9],
      },
      {
        description: "Compare 8 and 9 → 8 < 9, no swap → [2, 5, 1, 8, 9]. End of Pass 1. Largest element 9 is in place.",
        state: [2, 5, 1, 8, 9],
      },
      {
        description: "Pass 2: Compare 2 and 5 → no swap. Compare 5 and 1 → swap → [2, 1, 5, 8, 9]. Compare 5 and 8 → no swap. End of Pass 2. 8 is in place.",
        state: [2, 1, 5, 8, 9],
      },
      {
        description: "Pass 3: Compare 2 and 1 → swap → [1, 2, 5, 8, 9]. Compare 2 and 5 → no swap. End of Pass 3. 5 is in place.",
        state: [1, 2, 5, 8, 9],
      },
      {
        description: "Pass 4: Compare 1 and 2 → no swap. No swaps in this pass → array is sorted! Early termination.",
        state: [1, 2, 5, 8, 9],
      },
    ],
  },
  visualizationConfig: {
    engine: "array",
    initialData: [5, 2, 8, 1, 9],
    executionFrames: [
      {
        dataState: [5, 2, 8, 1, 9],
        activeIndices: [],
        sortedIndices: [],
        highlightedLines: [1],
        highlightedCodeLines: [4],
        teacherExplanation: "We start with an unsorted array. Bubble sort will make passes through this array, comparing adjacent elements and swapping when needed.",
        stepLabel: "Initial Array",
      },
      {
        dataState: [5, 2, 8, 1, 9],
        activeIndices: [0, 1],
        sortedIndices: [],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 1, Comparison 1: Compare arr[0]=5 and arr[1]=2. Since 5 > 2, we need to swap them.",
        stepLabel: "Pass 1: Compare 5 and 2",
      },
      {
        dataState: [2, 5, 8, 1, 9],
        activeIndices: [0, 1],
        sortedIndices: [],
        highlightedLines: [3],
        highlightedCodeLines: [7],
        teacherExplanation: "After swapping, 2 is now at index 0 and 5 is at index 1. The smaller element has bubbled left.",
        stepLabel: "Pass 1: Swap 5 and 2",
      },
      {
        dataState: [2, 5, 8, 1, 9],
        activeIndices: [1, 2],
        sortedIndices: [],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 1, Comparison 2: Compare arr[1]=5 and arr[2]=8. Since 5 < 8, no swap needed.",
        stepLabel: "Pass 1: Compare 5 and 8",
      },
      {
        dataState: [2, 5, 8, 1, 9],
        activeIndices: [2, 3],
        sortedIndices: [],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 1, Comparison 3: Compare arr[2]=8 and arr[3]=1. Since 8 > 1, we need to swap.",
        stepLabel: "Pass 1: Compare 8 and 1",
      },
      {
        dataState: [2, 5, 1, 8, 9],
        activeIndices: [2, 3],
        sortedIndices: [],
        highlightedLines: [3],
        highlightedCodeLines: [7],
        teacherExplanation: "After swapping, 1 is at index 2 and 8 has moved right. The larger element continues bubbling toward the end.",
        stepLabel: "Pass 1: Swap 8 and 1",
      },
      {
        dataState: [2, 5, 1, 8, 9],
        activeIndices: [3, 4],
        sortedIndices: [],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 1, Comparison 4: Compare arr[3]=8 and arr[4]=9. Since 8 < 9, no swap needed.",
        stepLabel: "Pass 1: Compare 8 and 9",
      },
      {
        dataState: [2, 5, 1, 8, 9],
        activeIndices: [],
        sortedIndices: [4],
        highlightedLines: [4],
        highlightedCodeLines: [4],
        teacherExplanation: "End of Pass 1. The largest element (9) has bubbled to its correct position at the end. We now know the last element is sorted.",
        stepLabel: "Pass 1 Complete — 9 is in place",
        predictionPrompt: {
          question: "After Pass 1, the largest element 9 is at the end. In Pass 2, which element will end up at index 3 (second-to-last)?",
          options: ["1", "2", "5", "8"],
          correctAnswer: "8",
          explanation: "In Pass 2, we compare up to the second-to-last element. The next largest element (8) will bubble to index 3, its correct sorted position.",
        },
      },
      {
        dataState: [2, 5, 1, 8, 9],
        activeIndices: [0, 1],
        sortedIndices: [4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 2, Comparison 1: Compare arr[0]=2 and arr[1]=5. Since 2 < 5, no swap needed.",
        stepLabel: "Pass 2: Compare 2 and 5",
      },
      {
        dataState: [2, 5, 1, 8, 9],
        activeIndices: [1, 2],
        sortedIndices: [4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 2, Comparison 2: Compare arr[1]=5 and arr[2]=1. Since 5 > 1, we need to swap.",
        stepLabel: "Pass 2: Compare 5 and 1",
      },
      {
        dataState: [2, 1, 5, 8, 9],
        activeIndices: [1, 2],
        sortedIndices: [4],
        highlightedLines: [3],
        highlightedCodeLines: [7],
        teacherExplanation: "After swapping, 1 is at index 1 and 5 has moved to index 2. The 5 continues bubbling right.",
        stepLabel: "Pass 2: Swap 5 and 1",
      },
      {
        dataState: [2, 1, 5, 8, 9],
        activeIndices: [2, 3],
        sortedIndices: [4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 2, Comparison 3: Compare arr[2]=5 and arr[3]=8. Since 5 < 8, no swap needed.",
        stepLabel: "Pass 2: Compare 5 and 8",
      },
      {
        dataState: [2, 1, 5, 8, 9],
        activeIndices: [],
        sortedIndices: [3, 4],
        highlightedLines: [4],
        highlightedCodeLines: [4],
        teacherExplanation: "End of Pass 2. The second-largest element (8) is now in its correct position. Two elements are sorted.",
        stepLabel: "Pass 2 Complete — 8 is in place",
      },
      {
        dataState: [2, 1, 5, 8, 9],
        activeIndices: [0, 1],
        sortedIndices: [3, 4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 3, Comparison 1: Compare arr[0]=2 and arr[1]=1. Since 2 > 1, we need to swap.",
        stepLabel: "Pass 3: Compare 2 and 1",
      },
      {
        dataState: [1, 2, 5, 8, 9],
        activeIndices: [0, 1],
        sortedIndices: [3, 4],
        highlightedLines: [3],
        highlightedCodeLines: [7],
        teacherExplanation: "After swapping, 1 is at index 0 and 2 is at index 1. The array is starting to look sorted!",
        stepLabel: "Pass 3: Swap 2 and 1",
      },
      {
        dataState: [1, 2, 5, 8, 9],
        activeIndices: [1, 2],
        sortedIndices: [3, 4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 3, Comparison 2: Compare arr[1]=2 and arr[2]=5. Since 2 < 5, no swap needed.",
        stepLabel: "Pass 3: Compare 2 and 5",
      },
      {
        dataState: [1, 2, 5, 8, 9],
        activeIndices: [],
        sortedIndices: [2, 3, 4],
        highlightedLines: [4],
        highlightedCodeLines: [4],
        teacherExplanation: "End of Pass 3. The element 5 is now in its correct position. Three elements are sorted.",
        stepLabel: "Pass 3 Complete — 5 is in place",
      },
      {
        dataState: [1, 2, 5, 8, 9],
        activeIndices: [0, 1],
        sortedIndices: [2, 3, 4],
        highlightedLines: [2, 3],
        highlightedCodeLines: [5, 6],
        teacherExplanation: "Pass 4, Comparison 1: Compare arr[0]=1 and arr[1]=2. Since 1 < 2, no swap needed.",
        stepLabel: "Pass 4: Compare 1 and 2",
      },
      {
        dataState: [1, 2, 5, 8, 9],
        activeIndices: [],
        sortedIndices: [0, 1, 2, 3, 4],
        highlightedLines: [5],
        highlightedCodeLines: [9],
        teacherExplanation: "Pass 4 had no swaps! The array is already sorted. The optimized bubble sort detects this and terminates early — this is the O(n) best case.",
        stepLabel: "Sorted! Early termination",
      },
    ],
  },
  pseudocode: [
    "FOR i FROM 0 TO n-1:",
    "  FOR j FROM 0 TO n-i-2:",
    "    IF arr[j] > arr[j+1]:",
    "      SWAP arr[j] and arr[j+1]",
    "  IF no swaps occurred, BREAK",
    "RETURN arr",
  ],
  multiLangCode: {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    // Early termination if already sorted
    if (!swapped) break;
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early termination if already sorted
        if not swapped:
            break
    return arr`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // Early termination if already sorted
        if (!swapped) break;
    }
}`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent elements
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // Early termination if already sorted
        if (!swapped) break;
    }
}`,
  },
  complexity: {
    best: "O(n) — when array is already sorted (with optimization)",
    average: "O(n²)",
    worst: "O(n²) — when array is reverse sorted",
    space: "O(1) — sorting is done in-place",
    explanation:
      "The nested loop structure gives O(n²) in the average and worst case. The outer loop runs n-1 times, and the inner loop runs up to n-i-1 times. With the early termination optimization, if the array is already sorted, only one pass is needed: O(n).",
  },
  practiceExercises: [
    {
      id: "bubble-practice-1",
      type: "dry-run",
      title: "Trace One Pass",
      description: "Given [3, 1, 4, 1, 5], trace the first pass of bubble sort. What does the array look like after Pass 1?",
      initialData: [3, 1, 4, 1, 5],
      correctAnswer: "[1, 3, 1, 4, 5]",
      explanation: "Pass 1: Compare 3,1→swap→[1,3,4,1,5]. Compare 3,4→no swap. Compare 4,1→swap→[1,3,1,4,5]. Compare 4,5→no swap. Result: [1,3,1,4,5], with 5 in place.",
    },
    {
      id: "bubble-practice-2",
      type: "prediction",
      title: "Predict the Swap",
      description: "In bubble sort on [4, 2, 7, 1], how many swaps happen in the first pass?",
      prompt: "How many swaps occur during the first pass of bubble sort on [4, 2, 7, 1]?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      explanation: "Pass 1: 4>2→swap(1), 4<7→no swap, 7>1→swap(2). Total: 2 swaps. Result: [2, 4, 1, 7].",
    },
    {
      id: "bubble-practice-3",
      type: "multiple-choice",
      title: "Best Case Complexity",
      description: "With the early termination optimization, what is the best-case time complexity of bubble sort?",
      options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: "O(n)",
      explanation: "If the array is already sorted, the first pass makes no swaps, and the algorithm terminates after one pass: O(n).",
    },
    {
      id: "bubble-practice-4",
      type: "fill-in-the-blank",
      title: "Number of Passes",
      description: "For an array of n elements, bubble sort makes at most ___ passes.",
      correctAnswer: "n-1",
      explanation: "After n-1 passes, the n-1 largest elements are in place, so the smallest element must also be in place. Maximum passes = n-1.",
    },
    {
      id: "bubble-practice-5",
      type: "structured-coding",
      title: "Implement Bubble Sort",
      description: "Write the bubble sort function. Include the early termination optimization.",
      starterCode: `function bubbleSort(arr) {
  // Write your code here
  // Hint: Use nested loops and a 'swapped' flag
}`,
      expectedOutput: "A sorted array in ascending order",
      explanation: "The outer loop controls passes, the inner loop compares adjacent elements, and the swapped flag enables early termination when no swaps occur in a pass.",
    },
  ],
  quiz: [
    {
      id: "bubble-quiz-1",
      type: "multiple-choice",
      question: "How does bubble sort determine that the array is sorted?",
      options: [
        { id: "a", label: "It checks if all elements are in order after each swap", isCorrect: false },
        { id: "b", label: "It detects when a complete pass makes no swaps", isCorrect: true },
        { id: "c", label: "It counts the number of passes and stops at n-1", isCorrect: false },
        { id: "d", label: "It uses a separate sorted flag set after each pass", isCorrect: false },
      ],
      explanation: "The optimization checks if any swaps occurred during a pass. If none did, every adjacent pair is in order, meaning the array is sorted.",
    },
    {
      id: "bubble-quiz-2",
      type: "multiple-choice",
      question: "What is the worst-case time complexity of bubble sort?",
      options: [
        { id: "a", label: "O(n)", isCorrect: false },
        { id: "b", label: "O(n log n)", isCorrect: false },
        { id: "c", label: "O(n²)", isCorrect: true },
        { id: "d", label: "O(2ⁿ)", isCorrect: false },
      ],
      explanation: "The worst case occurs when the array is reverse-sorted. Every comparison results in a swap, and all n-1 passes are needed: O(n²).",
    },
    {
      id: "bubble-quiz-3",
      type: "multiple-choice",
      question: "What is the space complexity of bubble sort?",
      options: [
        { id: "a", label: "O(n)", isCorrect: false },
        { id: "b", label: "O(1)", isCorrect: true },
        { id: "c", label: "O(log n)", isCorrect: false },
        { id: "d", label: "O(n²)", isCorrect: false },
      ],
      explanation: "Bubble sort sorts in-place — it only uses a constant amount of extra space for the temp variable and loop counters: O(1).",
    },
    {
      id: "bubble-quiz-4",
      type: "true-false",
      question: "Bubble sort is a stable sorting algorithm.",
      options: [
        { id: "a", label: "True", isCorrect: true },
        { id: "b", label: "False", isCorrect: false },
      ],
      explanation: "Yes — bubble sort only swaps when arr[j] > arr[j+1], not when they are equal. This preserves the relative order of equal elements, making it stable.",
    },
    {
      id: "bubble-quiz-5",
      type: "fill-in-the-blank",
      question: "After the first pass of bubble sort, the ___ element is guaranteed to be in its correct position.",
      correctAnswer: "largest",
      explanation: "After each pass, the largest unsorted element bubbles to the end. After Pass 1, the largest element is in its final position.",
    },
  ],
  nextLessonId: null,
};
