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
            LookupController controller = new LookupController();



            List<SkillSmart.Dto.LookupDto> jobSeekerList = controller.GetAll("SkillAcquired").ToList<SkillSmart.Dto.LookupDto>();
            /*  if (jobSeekerList.Count >= 0)
              {

                  if (jobSeekerList.Count > 0)
                  {*/
            //var jobSeeker = controller.GetAll("State", "ec6bf599-c460-45b0-a093-a78c325cf08f");

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();072de9e5-9612-48b9-a86c-16d8f2381eec   
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);   9a1e5c72-757a-4486-bd95-5b20a84c08a0
             }



            LookupDto AddinInfo = new LookupDto();
            AddinInfo.Name = "Certification";


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