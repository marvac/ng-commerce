using System.Net;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetStatusMessage(statusCode);
        }

        public ApiResponse(HttpStatusCode statusCode, string message = null)
        {
            StatusCode = (int)statusCode;
            Message = message ?? GetStatusMessage((int)statusCode);
        }

        private static string GetStatusMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Generic client error",
                401 => "You are not authorized to view this resource",
                404 => "Resource not found",
                500 => "Generic server error",

                _ => $"Some other type of error ({statusCode})",
            };
        }
    }
}