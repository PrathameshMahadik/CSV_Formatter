import { NextFunction, Request, Response } from "express";
import CSVDetails from "../services/csvDetails"; 
import { getAllData, totalCsvCount } from "../repository/BulkUpload/Repository";
import { CustomError } from "../middlewares/errorHandler";

jest.mock("../repository/BulkUpload/Repository", () => ({
  getAllData: jest.fn(),
  totalCsvCount: jest.fn(),
}));

describe("CSVDetails Controller", () => {
  let csvDetails: CSVDetails;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    csvDetails = new CSVDetails();
    req = {
      query: {
        _limit: "10",
        _page: "1",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should fetch data successfully", async () => {
    const mockData = [{ id: 1, name: "Test Data" }];
    const mockCount = 100;

    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (totalCsvCount as jest.Mock).mockResolvedValue(mockCount);

    await csvDetails.getAllDetails(req as Request, res as Response, next);

    expect(totalCsvCount).toHaveBeenCalledTimes(1);
    expect(getAllData).toHaveBeenCalledWith(0, "10");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Data fetched successfully",
      data: mockData,
      count: mockCount,
    });
  });

  it("should handle errors during data fetching", async () => {
    const mockError = new Error("Database Error");

    (totalCsvCount as jest.Mock).mockRejectedValue(mockError);

    await csvDetails.getAllDetails(req as Request, res as Response, next);

    expect(totalCsvCount).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenCalledWith(
      new CustomError("Error while fetching posts", 500)
    );
  });
});
