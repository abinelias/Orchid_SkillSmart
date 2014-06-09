using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using MGMProfileExtension.Models;
using SkillSmartMongoDA.Services;
using MongoDB.Driver;
using SkillSmartData.Factory;
using System.Net.Mail;

namespace MGMProfileExtension
{
  public class Posting
  {
    //public MGMProfile profile { get; set; }
    public string email { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string ageRange { get; set; }
    public List<PositionOpening> openings { get; set; }
  }
  public class MGMProfileController : ApiController
  {

    [Route("api/MGMPositions")]
    public List<PositionOpening> GetPositions()
    {
      List<PositionOpening> openings = new List<PositionOpening>();

      openings.Add(new PositionOpening { positionId = Guid.NewGuid().ToString(), title = "Position 1", interestLevel = 0 });
      openings.Add(new PositionOpening { positionId = Guid.NewGuid().ToString(), title = "Position 2", interestLevel = 0, });
      openings.Add(new PositionOpening { positionId = Guid.NewGuid().ToString(), title = "Position 3", interestLevel = 0});
      return openings;
    }

    /// <summary>
    /// To update the jobseeker details
    /// </summary>
    /// <param name="id">jobseekerId</param>
    /// <param name="profile">MGMProfile instance</param>
    public string Post(MGMProfile profile) 
    {
      try
      {
        //MGMProfile profile = new MGMProfile { email = data.email, firstName = data.firstName, lastName = data.lastName, ageRange = data.ageRange };
        MGMProfileService svc = new MGMProfileService(DatabaseFactory.CreateMongoDatabase());
        if (svc.ProfileExists(profile.email))
          return "The email address has already been registered.";
        svc.Create(profile);
        SendEmail(profile.email);
        return string.Empty;
      }
      catch 
      {
        return "There was a problem saving your information.";
      }
    }

    private void SendEmail(string to)
    {
      System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
      msg.Subject = "Email Subject";
      msg.From = new System.Net.Mail.MailAddress("rsholtes@simblox.com");
      msg.To.Add(to);
      msg.IsBodyHtml = true;
      msg.Body = "Read this from some file or db entry";
      
      System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient("email-smtp.us-east-1.amazonaws.com", 587);
      client.Credentials = new System.Net.NetworkCredential("AKIAJKQYX4CM6W4RO5HA", "AjJO/eIeBrn2SdJUT5ckqcot6VhMiS6pBawWxtKL8N8c");
      client.EnableSsl = true;
      client.SendCompleted += (s,e) => {
        if (e.Error == null)
        {
          MGMProfileService svc = new MGMProfileService(DatabaseFactory.CreateMongoDatabase());
          svc.UpdateEmailStatus(e.UserState.ToString(), true);
        }
        client.Dispose(); 
      };
      client.SendAsync(msg, to);
    }

  }
}
