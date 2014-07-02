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
    public class GetJobSeekerSkillsWithSkillIdController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.ListingJobSeekerSkills> GetAllJobSeekersSkillsListForSkillId(String id)
        {
            var alljobSeekerSkills = ServiceFactory.GetJobSeekerSkillsListWithSkillId().GetAllJobSeekersSkillsListForSkillId(id);
            var allCategory = ServiceFactory.GetCategory().GetAllCategory();
            var allSkillList = ServiceFactory.GetSkill().GetAll();
            var allSkillMap = ServiceFactory.GetSkillMap().GetAllSkillMap();


            List<SkillSmart.Dto.ListingJobSeekerSkills> jobSeekerskillList = new List<SkillSmart.Dto.ListingJobSeekerSkills>();
            foreach (JobSeekerSkillList jobseekerSkill in alljobSeekerSkills)
            {
                foreach (SkillMap skillMap in allSkillMap)
                {
                    if (jobseekerSkill.SkillMapId == skillMap.Id.ToString())
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

                        SkillSmart.Dto.ListingJobSeekerSkills jobSeekerskillObj = new SkillSmart.Dto.ListingJobSeekerSkills();
                        jobSeekerskillObj.CategoryId = categoryId;
                        jobSeekerskillObj.CategoryName = categoryName;
                        jobSeekerskillObj.SpecialityId = specialityId;
                        jobSeekerskillObj.SpecialityName = specialityName;
                        jobSeekerskillObj.SkillId = skillId;
                        jobSeekerskillObj.SkillName = skillName;

                        jobSeekerskillObj.SkillMapId = jobseekerSkill.SkillMapId;
                        jobSeekerskillObj.AcquiredId = jobseekerSkill.SkillAcquiredId;
                        jobSeekerskillObj.SkillParentCollectionId = jobseekerSkill.SkillParentCollectionId;
                        jobSeekerskillObj.SkillScore = jobseekerSkill.ProficiencyId;
                        jobSeekerskillObj.JobSeekerId = jobseekerSkill.JobSeekerId;
                        jobSeekerskillObj.Id = jobseekerSkill.Id.ToString();

                        jobSeekerskillList.Add(jobSeekerskillObj);
                        break;
                    }
                }
            }
            return jobSeekerskillList.OrderBy(p => p.JobSeekerId).ThenBy(p => p.CategoryName).ThenBy(p => p.SpecialityName);
            
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}