using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekersEducation<T> 
    {
        IEnumerable<T> GetAllJobSeekersEducation(string jobSeekerId);
    }
}
