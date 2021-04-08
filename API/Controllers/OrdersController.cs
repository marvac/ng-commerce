using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            var email = HttpContext.User.GetEmailFromPrincipal();
            var shipToAddress = _mapper.Map<Address>(orderDTO.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDTO.DeliveryMethodId, orderDTO.BasketId, shipToAddress);
            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating order"));
            }

            return Ok(order);
        }
    }
}
