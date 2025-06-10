using Microsoft.AspNetCore.Mvc;

namespace infiniteos.Controllers
{
    public class Services : Controller
    {
        public IActionResult Staffing()
        {
            return View();
        }
        public IActionResult Recruiting()
        {
            return View();
        }
        public IActionResult Consulting()
        {
            return View();
        }

        public IActionResult WarehouseAutomation()
        {
            return View();
        }
    }
}
