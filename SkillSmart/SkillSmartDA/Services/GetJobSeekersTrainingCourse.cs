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
    public class GetJobSeekersTrainingCourse : EntityService<TrainingCourse>, IGetJobSeekersTrainingCourse<SkillSmart.Dto.TrainingCourse>
    {
        public GetJobSeekersTrainingCourse(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.TrainingCourse> GetAllJobSeekersTrainingCourse(string id)
        {
            string[] split = id.Split(',');
            List<string> jobSeekerIdList = new List<string>();
            foreach (string item in split)
            {
                jobSeekerIdList.Add(item);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<TrainingCourse>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));

            List<SkillSmart.Dto.TrainingCourse> jobSeekerWorkHostory = new List<SkillSmart.Dto.TrainingCourse>();
            foreach (TrainingCourse jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.TrainingCourse jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.TrainingCourse, SkillSmart.Dto.TrainingCourse>(jobSeeker);
                jobSeekerWorkHostory.Add(jobSeekerObj);
            }
            return jobSeekerWorkHostory;
        }
    }
}
