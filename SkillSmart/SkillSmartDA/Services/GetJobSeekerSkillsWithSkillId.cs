using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class GetJobSeekerSkillsWithSkillId : EntityService<JobSeekerSkillList>, IGetJobSeekerSkillsListWithSkillIdService<SkillSmart.Dto.JobSeekerSkillList>
    {
        public GetJobSeekerSkillsWithSkillId(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all skills of a jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>JobseekerSkill Object</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerSkillList> GetAllJobSeekersSkillsListForSkillId(string id)
        {

            string[] split = id.Split(',');
            List<string> jobSkillsIdList = new List<string>();
            foreach (string item in split)
            {
                jobSkillsIdList.Add(item);
            }
            List<SkillSmart.Dto.JobSeekerSkillList> jobSeekerWorkHostory = new List<SkillSmart.Dto.JobSeekerSkillList>();
            var queryble = this.MongoCollection.AsQueryable<JobSeekerSkillList>().Where(c => jobSkillsIdList.Contains(c.SkillMapId));
            List<string> jobSeekerIdList = new List<string>();

            foreach (JobSeekerSkillList jobSeeker in queryble)
            {
                if (!jobSeekerIdList.Contains(jobSeeker.JobSeekerId))
                    jobSeekerIdList.Add(jobSeeker.JobSeekerId);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<JobSeekerSkillList>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));
            foreach (JobSeekerSkillList jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.JobSeekerSkillList jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSkillList, SkillSmart.Dto.JobSeekerSkillList>(jobSeeker);
                jobSeekerWorkHostory.Add(jobSeekerObj);
            }
            return jobSeekerWorkHostory;
        }

        /// <summary>
        /// Function to Create a skill for the  JobSeeker 
        /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Create(SkillSmart.Dto.JobSeekerSkillList entity)
        {

        }

        /// <summary>
        /// Function to get details of a skill of the JobSeeker 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>JobseekerSkill Object</returns>
        public new SkillSmart.Dto.JobSeekerSkillList GetById(string id)
        {
            JobSeekerSkillList dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeekerSkillList seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSkillList, SkillSmart.Dto.JobSeekerSkillList>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update a JobSeeker Skill 
        /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Update(SkillSmart.Dto.JobSeekerSkillList entity)
        {

        }

        /// <summary>
        /// Function to Delete a JobSeeker Skill 
        /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Delete(SkillSmart.Dto.JobSeekerSkillList entity)
        {

        }
    }
}
