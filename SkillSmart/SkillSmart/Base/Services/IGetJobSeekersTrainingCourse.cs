using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekersTrainingCourse<T> 
    {
        IEnumerable<T> GetAllJobSeekersTrainingCourse(string jobSeekerId);
    }
}
