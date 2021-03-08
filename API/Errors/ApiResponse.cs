using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

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

        private string GetStatusMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Client error",
                404 => "Resource not found",
                500 => "Server error",
             
                _ => "Some other type of error",
            };
        }
    }
}
