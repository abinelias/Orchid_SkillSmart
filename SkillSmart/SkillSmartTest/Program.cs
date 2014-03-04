using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillSmartWebAPI.Controllers;
using SkillSmart.Dto;
namespace SkillSmartTest
{
    class Program
    {
        public static void Main(string[] args)
        {
            AdditionalInformationController controller = new AdditionalInformationController();



            //List<Education> jobSeekerList = controller.GetAllEducationById().ToList<Education>();
            /*  if (jobSeekerList.Count >= 0)
              {

                  if (jobSeekerList.Count > 0)
                  {*/
            var jobSeeker = controller.Get("8f500a04-22f0-40fa-b4ce-c24c3813d3d2");

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);
             }

            AdditionalInformation AddinInfo = new AdditionalInformation();
            AddinInfo.JobSeekerId = "8f500a04-22f0-40fa-b4ce-c24c3813d3d2";
            AddinInfo.PreferedName = "Saintgits";
            AddinInfo.AddressLine1 = "Engineering";
            AddinInfo.AddressLine2 = "27TH Jun 2011";
            AddinInfo.City = "30Th Jun 2013";
            AddinInfo.StateId = "Computer";
            AddinInfo.CountryId = "Economics";
            AddinInfo.ZipCode = "No";
            AddinInfo.Citizenship = "68.4";
            AddinInfo.Gender = "30Th Jun 2013";
            AddinInfo.HomePhone = "Computer";
            AddinInfo.Mobile = "Economics";
            AddinInfo.MethodOfContact = "No";
            AddinInfo.Birthday = "68.4";
            AddinInfo.RaceId = "68.4";

            controller.Post(AddinInfo);
         }


            //List<LookupDto> jobSeekerList2 = controller.GetAll("State").ToList<LookupDto>();
            /*if (jobSeekerList2.Count > 1)
            {
               controller.Delete(jobSeekerList2[1].Id.ToString());
            }
        }*/

        }

    }
}