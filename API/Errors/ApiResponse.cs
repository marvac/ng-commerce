using System;
using System.Collections.Generic;
using System.Linq;
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

        private string GetStatusMessage(int statusCode)
        {
            return statusCode switch
            {
                >= 500 => "Server error",
                >= 400 => "Client error",
                _ => "Some other type of error",
            };
        }
    }
}
