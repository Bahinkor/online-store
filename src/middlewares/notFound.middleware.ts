const routeNotFoundMiddleware = (req: any, res: any) => {
  res.status(404).json({ message: "This route is not found." });
};

export default routeNotFoundMiddleware;
