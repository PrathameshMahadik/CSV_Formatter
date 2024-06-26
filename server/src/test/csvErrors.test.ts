import { Request, Response, NextFunction } from "express";
import CSVErrors from "../services/csvErrors";
import { getErrors, totalErrorCount } from "../repository/CsvErrors/Repository";
import { CustomError } from "../middlewares/errorHandler";

jest.mock("../repository/CsvErrors/Repository");

describe("CSVErrors Controller", () => {
  let csvErrors: CSVErrors;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    csvErrors = new CSVErrors();
    req = {
      query: {
        _limit: "10",
        _page: "1",
        uploadId: "123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all errors successfully", async () => {
    (getErrors as jest.Mock).mockResolvedValue([
      { id: 1, error: "Test Error" },
    ]);
    (totalErrorCount as jest.Mock).mockResolvedValue(1);

    await csvErrors.getAllErrors(req as Request, res as Response, next);

    expect(getErrors).toHaveBeenCalledWith("123", 0, "10");
    expect(totalErrorCount).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Errors fetched successfully",
      data: [{ id: 1, error: "Test Error" }],
      count: 1,
    });
  });

  it("should handle errors", async () => {
    (getErrors as jest.Mock).mockRejectedValue(new Error("Error"));

    await csvErrors.getAllErrors(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      new CustomError("Error while fetching posts", 500)
    );
  });
});
