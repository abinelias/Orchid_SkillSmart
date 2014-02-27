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
            ScholarshipController controller = new ScholarshipController();

            //List<Education> jobSeekerList = controller.GetAllEducationById().ToList<Education>();
            /*  if (jobSeekerList.Count >= 0)
              {

                  if (jobSeekerList.Count > 0)
                  {*/
                    // var jobSeeker = controller.Get(jobSeekerList[0].Id.ToString());

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);
             }

            Scholarship AddinInfo = new Scholarship();
            AddinInfo.JobSeekerId = "8f500a04-22f0-40fa-b4ce-c24c3813d3d2";
            AddinInfo.InstitutionName = "Saintgits";
            AddinInfo.DegreeId = "Engineering";
            AddinInfo.StartDate = "27TH Jun 2011";
            AddinInfo.EndDate = "30Th Jun 2013";
            AddinInfo.MajorFocus = "Computer";
            AddinInfo.MinorFocus = "Economics";
            AddinInfo.CurrentlyEnrolled = "No";
            AddinInfo.GPA = "68.4";

            controller.Post(AddinInfo);
         }*/


            //List<LookupDto> jobSeekerList2 = controller.GetAll("State").ToList<LookupDto>();
                /*if (jobSeekerList2.Count > 1)
                {
                   controller.Delete(jobSeekerList2[1].Id.ToString());
                }*/
            }

        }
    
}
