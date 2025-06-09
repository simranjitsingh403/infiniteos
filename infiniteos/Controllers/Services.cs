using Microsoft.AspNetCore.Mvc;

namespace infiniteos.Controllers
{
    public class Services : Controller
    {
        public IActionResult Staffing()
        {
            return View();
        }
    }
}
