using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobSeekerAppliedJobsService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllJobsJobSeeker(string jobSeekerId);
    }
}
