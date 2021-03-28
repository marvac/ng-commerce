using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Actions for forcing an erroneous return codes
    /// </summary>
    public class FailController : BaseApiController
    {
        [HttpGet("{code}")]
        public ActionResult ReturnCode(string code)
        {
            if (int.TryParse(code, out int statusCode))
            {
                return StatusCode(statusCode, new ApiResponse(statusCode, $"Error thrown: {statusCode}"));
            }

            return StatusCode(500, new ApiResponse(500, $"Unknown status code: {code}"));
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> TestAuthentication()
        {
            return "Authentication passed";
        }

    }
}