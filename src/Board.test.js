import React from 'react';
import { render, fireEvent } from "@testing-library/react";
const domTestingLib = require('@testing-library/dom');
const { queryHelpers } = domTestingLib
import Board from "./Board";

// beforeEach(function(){
//     jest 
//         .spyOn(Math, "random")
//         .mockReturnValue(1)
// });



it("matches snapshot", function() {
    jest
        .spyOn(Math, "random")
        .mockReturnValue(0)
    const {asFragment} = render(<Board />);
    expect(asFragment).toMatchSnapshot();
});

it("shows winning message only when all cells are off", function() {
    jest
        .spyOn(Math, "random")
        .mockReturnValue(1)

    const {queryByTestId} = render(<Board />);

    //expect winning message to be displayed
    expect(queryByTestId("win-message")).toBeInTheDocument()

    //expect board not to be displayed
    expect(queryByTestId("board")).not.toBeInTheDocument() 
});

it("handles cell clicking correctly", function() {
    jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0)
        .mockReturnValue(1)
    const { queryByTestId } = render(<Board />);

    const litCell = queryByTestId("0-0");

    //check that cell with coordinates 0-0 is list but its neighbors are not
    expect(queryByTestId("0-0")).toHaveClass('Cell Cell-lit');
    expect(queryByTestId("0-1")).not.toHaveClass('Cell Cell-lit');
    expect(queryByTestId("1-0")).not.toHaveClass('Cell Cell-lit');

    fireEvent.click(litCell);

    //make sure the cell is now dark, and has flipped its neighbors
    expect(queryByTestId("0-0")).not.toHaveClass('Cell Cell-lit');
    expect(queryByTestId("0-1")).toHaveClass('Cell Cell-lit');
    expect(queryByTestId("1-0")).toHaveClass('Cell Cell-lit');
})