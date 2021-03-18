﻿using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Actions for forcing an erroneous return codes
    /// </summary>
    public class FailController : BaseApiController
    {
        [HttpGet("{code}")]
        public IActionResult ReturnCode(string code)
        {
            if (int.TryParse(code, out int statusCode))
            {
                return StatusCode(statusCode, new ApiResponse(statusCode, $"Error thrown: {statusCode}"));
            }

            return StatusCode(500, new ApiResponse(500, $"Unknown status code: {code}"));
        }

    }
}