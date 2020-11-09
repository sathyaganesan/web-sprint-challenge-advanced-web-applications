import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import BubblePage from "./BubblePage";
import mockFetchColor from '../api/mockFetchColor';
import '@testing-library/jest-dom/extend-expect'

// mock data

const colors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4"
    },
    id: 4
  },
  {
    color: "lilac",
    code: {
      hex: "#9a99dd"
    },
    id: 5
  },
  {
    color: "softpink",
    code: {
      hex: "#dd99ba"
    },
    id: 6
  },
  {
    color: "bisque",
    code: {
      hex: "#dd9a99"
    },
    id: 7
  }
  
];

jest.mock('../api/mockFetchColor');


test("Fetches data and renders the bubbles", async () => {
  mockFetchColor.mockResolvedValue([colors]);

 const {getByText} = render(<BubblePage />);
  
  await waitFor(() => getByText(/colors/i));
  userEvent.screen(/colors/i);

  const fetchingColor = screen.getByText(/colors/i);
  userEvent.screen(fetchingColor);
});
