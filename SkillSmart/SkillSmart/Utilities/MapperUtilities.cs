using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace SkillSmart.Utilities
{
    public class MapperUtilities
    {
        public static TDomainModel MapToDomainModel<TViewModel, TDomainModel>(TViewModel viewModel)
        {
            Mapper.CreateMap<TViewModel, TDomainModel>();
            TDomainModel result = Mapper.Map<TViewModel, TDomainModel>(viewModel);
            return result;
        }

        public static TViewModel MapToViewModel<TDomainModel, TViewModel>(TDomainModel domainModel)
        {
            Mapper.CreateMap<TDomainModel, TViewModel>();
            TViewModel result = Mapper.Map<TDomainModel, TViewModel>(domainModel);
            return result;
        } 
    }
}
