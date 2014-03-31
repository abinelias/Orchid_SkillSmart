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
            ListJobSeekerSkillController controller = new ListJobSeekerSkillController();



            List<SkillSmart.Dto.ListingJobSeekerSkills> jobSeekerList = controller.GetAll("d7cb31e2-2288-44f7-99af-f1a27fc8027a").ToList<SkillSmart.Dto.ListingJobSeekerSkills>();
            /*  if (jobSeekerList.Count >= 0)
              {

                  if (jobSeekerList.Count > 0)
                  {*/
            //var jobSeeker = controller.GetAll("State", "ec6bf599-c460-45b0-a093-a78c325cf08f");

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();072de9e5-9612-48b9-a86c-16d8f2381eec   
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);   
             }  250013dd-e72d-46f8-87fa-89de662038ce  32723928-c866-414f-ba4d-9352874741b1   998f4c00-a8cf-448d-bcfa-2334a428e627   37f78176-e988-43e4-b66e-84a1c60f6ae6

            

            SkillMap AddinInfo = new SkillMap();
            AddinInfo.CategoryId = "e368323a-ad61-403d-82ba-5644a64305e4";
            AddinInfo.SkillId = "32723928-c866-414f-ba4d-9352874741b1";


            controller.Post(AddinInfo); */



            //List<LookupDto> jobSeekerList2 = controller.GetAll("SecurityClearance").ToList<LookupDto>();
            //if (jobSeekerList2.Count > 1)
            //{
             //  controller.Delete(jobSeekerList2[1].Id.ToString());
            //}
        //}

        }

    }
}