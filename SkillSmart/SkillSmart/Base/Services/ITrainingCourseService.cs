using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ITrainingCourseService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerTrainingCourseById(string id);

    }
}
