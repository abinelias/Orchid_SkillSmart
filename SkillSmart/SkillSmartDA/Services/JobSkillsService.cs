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
    public class JobSkillsService : EntityService<JobSkills>, IJobSkillsService<SkillSmart.Dto.JobSkills>
    {
        public JobSkillsService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSkills> GetAll(string jobId)
        {
            List<SkillSmart.Dto.JobSkills> jobListCursor = new List<SkillSmart.Dto.JobSkills>();
            if (jobId == "")
            {
                var jobSeekerList = this.MongoCollection.FindAllAs<JobSkills>(); //get all jobseekers

                //Creating jobseeker object jobSeekerCursor
                foreach (JobSkills jobSeeker in jobSeekerList)
                {
                    SkillSmart.Dto.JobSkills jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSkills, SkillSmart.Dto.JobSkills>(jobSeeker);
                    jobListCursor.Add(jobSeekerObj);
                }
            }
            else 
            {
                string[] split = jobId.Split(',');
                List<string> jobIdList = new List<string>();
                foreach (string item in split)
                {
                    jobIdList.Add(item);
                }
                var JobSkills = this.MongoCollection.AsQueryable<JobSkills>().Where(c => jobIdList.Contains(c.JobId));
                foreach (JobSkills jobSeeker in JobSkills)
                {
                    SkillSmart.Dto.JobSkills jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSkills, SkillSmart.Dto.JobSkills>(jobSeeker);
                    jobListCursor.Add(jobSeekerObj);
                }
            }
            return jobListCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobSkills entity)
        {
            SkillSmartMongoDA.Entities.JobSkills seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSkills, SkillSmartMongoDA.Entities.JobSkills>(entity);
            base.Create(seeker);
        }


        public new SkillSmart.Dto.JobSkills GetById(string id)
        {
            JobSkills dbObj = base.GetById(id);
            SkillSmart.Dto.JobSkills seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSkills, SkillSmart.Dto.JobSkills>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobSkills entity)
        {
            JobSkills seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSkills, SkillSmartMongoDA.Entities.JobSkills>(entity);
            base.Update(seeker);       
        }


        public void Delete(SkillSmart.Dto.JobSkills entity)
        {
            JobSkills seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSkills, SkillSmartMongoDA.Entities.JobSkills>(entity);
            base.Delete(seeker);
        }

    }
}
