// Error handling middleware
export default function errorHandling(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
}
