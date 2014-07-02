using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using SkillSmartWebAPI.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace SkillSmartWebAPI.Controllers
{
    public class GetJobSkillsForJobIdController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.ListJobSkills> GetAllJobSkillsForJobId(String jobId)
        {
            var alljobSkills = ServiceFactory.GetJobSkills().GetAll(jobId);
            var allCategory = ServiceFactory.GetCategory().GetAllCategory();
            var allSkillList = ServiceFactory.GetSkill().GetAll();
            var allSkillMap = ServiceFactory.GetSkillMap().GetAllSkillMap();


            List<SkillSmart.Dto.ListJobSkills> jobSkillList = new List<SkillSmart.Dto.ListJobSkills>();
            foreach (JobSkills jobSkill in alljobSkills)
            {
                foreach (SkillMap skillMap in allSkillMap)
                {
                    if (jobSkill.SkillMapId == skillMap.Id.ToString())
                    {
                        var specialityId = skillMap.CategoryId;
                        var skillId = skillMap.SkillId;

                        var specialityName = "";
                        var categoryId = "";
                        var categoryName = "";
                        var skillName = "";

                        foreach (Category category in allCategory)
                        {
                            if (category.Id.ToString() == specialityId)
                            {
                                specialityName = category.CategoryName;
                                var parentid = category.ParentId;

                                foreach (Category findCategory in allCategory)
                                {
                                    if (findCategory.Id.ToString() == parentid)
                                    {
                                        categoryName = findCategory.CategoryName;
                                        categoryId = findCategory.Id.ToString();
                                        break;
                                    }
                                }
                                break;

                            }
                        }

                        foreach (Skill skill in allSkillList)
                        {
                            if (skill.Id.ToString() == skillId)
                            {
                                skillName = skill.SkillName;
                                break;
                            }
                        }

                        SkillSmart.Dto.ListJobSkills jobSkillObj = new SkillSmart.Dto.ListJobSkills();
                        jobSkillObj.CategoryId = categoryId;
                        jobSkillObj.CategoryName = categoryName;
                        jobSkillObj.SpecialityId = specialityId;
                        jobSkillObj.SpecialityName = specialityName;
                        jobSkillObj.SkillId = skillId;
                        jobSkillObj.SkillName = skillName;

                        jobSkillObj.JobId = jobSkill.JobId;
                        jobSkillObj.SkillMapId = jobSkill.SkillMapId;
                        jobSkillObj.SkillScore = jobSkill.SkillScore;
                        jobSkillObj.SkillImportance = jobSkill.SkillImportance;
                        jobSkillObj.SkillExperience = jobSkill.SkillExperience;
                        jobSkillObj.Id = jobSkill.Id.ToString();

                        jobSkillList.Add(jobSkillObj);
                        break;
                    }
                }
            }
            return jobSkillList.OrderBy(p => p.CategoryName).ThenBy(p => p.SpecialityName);

        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}