using System.Security.Claims;

namespace StockBook_App.Extensions
{
    public static class ClaimsExtension
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"))?.Value;
        }
    }
}
